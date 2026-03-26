import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, FileText, Settings, LogOut, Search, Filter,
  Trash2, CheckCircle, Clock, XCircle, ChevronDown, Key,
  BarChart3, TrendingUp, Home, Plus, Image as ImageIcon,
  Edit, Phone, Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: string | null;
  configuration: string | null;
  message: string | null;
  created_at: string;
  status: string;
  notes: string | null;
};

type Offer = {
  id: string;
  title: string;
  description: string | null;
  price: string;
  surface: string | null;
  rooms: string | null;
  type: string;
  features: string | null;
  images: string[] | null;
  active: boolean;
  created_at: string;
};

const statusColors: Record<string, string> = {
  nouveau: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  contacté: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  qualifié: "text-green-400 bg-green-400/10 border-green-400/30",
  perdu: "text-red-400 bg-red-400/10 border-red-400/30",
  converti: "text-gold bg-gold/10 border-gold/30",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const [offerForm, setOfferForm] = useState({
    title: "", description: "", price: "", surface: "", rooms: "",
    type: "villa", features: "", images: [] as string[], active: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin");
        return;
      }
      loadLeads();
      loadOffers();
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate("/admin");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadLeads = async () => {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (data) setLeads(data);
  };

  const loadOffers = async () => {
    const { data } = await supabase.from("offers").select("*").order("created_at", { ascending: false });
    if (data) setOffers(data);
  };

  const updateLeadStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (!error) {
      setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
      if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status });
      toast({ title: "Statut mis à jour", description: `Lead marqué comme "${status}"` });
    }
  };

  const addNoteToLead = async (id: string, note: string) => {
    const lead = leads.find((l) => l.id === id);
    const newNotes = (lead?.notes || "") + "\n" + note;
    const { error } = await supabase.from("leads").update({ notes: newNotes }).eq("id", id);
    if (!error) {
      setLeads(leads.map((l) => (l.id === id ? { ...l, notes: newNotes } : l)));
      if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, notes: newNotes });
    }
  };

  const deleteLead = async (id: string) => {
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (!error) {
      setLeads(leads.filter((l) => l.id !== id));
      setSelectedLead(null);
      toast({ title: "Lead supprimé" });
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast({ title: "Erreur", description: "Le mot de passe doit contenir au moins 6 caractères", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas", variant: "destructive" });
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }
    setShowPasswordModal(false);
    setNewPassword("");
    setConfirmPassword("");
    toast({ title: "Mot de passe modifié avec succès" });
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("offer-images").upload(path, file);
      if (!error) {
        const { data: urlData } = supabase.storage.from("offer-images").getPublicUrl(path);
        urls.push(urlData.publicUrl);
      }
    }
    return urls;
  };

  const handleSaveOffer = async () => {
    if (!offerForm.title || !offerForm.price) {
      toast({ title: "Erreur", description: "Titre et prix sont obligatoires", variant: "destructive" });
      return;
    }

    const offerData = {
      title: offerForm.title,
      description: offerForm.description,
      price: offerForm.price,
      surface: offerForm.surface,
      rooms: offerForm.rooms,
      type: offerForm.type,
      features: offerForm.features,
      images: offerForm.images,
      active: offerForm.active,
    };

    if (editingOffer) {
      const { error } = await supabase.from("offers").update(offerData).eq("id", editingOffer.id);
      if (error) {
        toast({ title: "Erreur", description: "Impossible de modifier l'offre", variant: "destructive" });
        return;
      }
      toast({ title: "Offre modifiée" });
    } else {
      const { error } = await supabase.from("offers").insert(offerData);
      if (error) {
        toast({ title: "Erreur", description: "Impossible de créer l'offre", variant: "destructive" });
        return;
      }
      toast({ title: "Offre ajoutée" });
    }

    setShowOfferModal(false);
    resetOfferForm();
    loadOffers();
  };

  const deleteOffer = async (id: string) => {
    const { error } = await supabase.from("offers").delete().eq("id", id);
    if (!error) {
      setOffers(offers.filter((o) => o.id !== id));
      setShowDeleteConfirm(null);
      toast({ title: "Offre supprimée" });
    }
  };

  const resetOfferForm = () => {
    setOfferForm({ title: "", description: "", price: "", surface: "", rooms: "", type: "villa", features: "", images: [], active: true });
    setEditingOffer(null);
  };

  const openEditOffer = (offer: Offer) => {
    setEditingOffer(offer);
    setOfferForm({
      title: offer.title,
      description: offer.description || "",
      price: offer.price,
      surface: offer.surface || "",
      rooms: offer.rooms || "",
      type: offer.type,
      features: offer.features || "",
      images: offer.images || [],
      active: offer.active,
    });
    setShowOfferModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const uploaded = await uploadImages(Array.from(files));
    setOfferForm((prev) => ({ ...prev, images: [...prev.images, ...uploaded] }));
  };

  const removeImage = (index: number) => {
    setOfferForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const filteredLeads = leads.filter((l) => {
    const matchSearch = !searchQuery ||
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery);
    const matchStatus = !statusFilter || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: leads.length,
    nouveau: leads.filter((l) => l.status === "nouveau").length,
    contacté: leads.filter((l) => l.status === "contacté").length,
    qualifié: leads.filter((l) => l.status === "qualifié").length,
    converti: leads.filter((l) => l.status === "converti").length,
  };

  const tabs = [
    { id: "dashboard", label: "Tableau de bord", icon: BarChart3 },
    { id: "leads", label: "Leads", icon: Users },
    { id: "offers", label: "Offres", icon: FileText },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-surface border-r border-border flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" className="text-gold">
              <rect x="8" y="20" width="4" height="16" rx="1" fill="currentColor" opacity="0.7" />
              <rect x="14" y="12" width="4" height="24" rx="1" fill="currentColor" opacity="0.85" />
              <rect x="20" y="4" width="4" height="32" rx="1" fill="currentColor" />
              <rect x="26" y="12" width="4" height="24" rx="1" fill="currentColor" opacity="0.85" />
              <rect x="32" y="20" width="4" height="16" rx="1" fill="currentColor" opacity="0.7" />
            </svg>
            <div>
              <span className="text-foreground text-sm font-semibold tracking-wide-luxury font-body block">ADMIN</span>
              <span className="text-foreground/40 text-xs font-body">Benak Hills</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-body rounded transition-all ${
                activeTab === tab.id
                  ? "bg-primary/10 text-gold border-l-2 border-gold"
                  : "text-foreground/60 hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-body text-foreground/60 hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            Voir le site
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-body text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="p-8">
            <h1 className="text-2xl font-heading mb-8">Tableau de bord</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Total Leads", value: stats.total, icon: Users, color: "text-foreground" },
                { label: "Nouveaux", value: stats.nouveau, icon: Clock, color: "text-blue-400" },
                { label: "Qualifiés", value: stats.qualifié, icon: CheckCircle, color: "text-green-400" },
                { label: "Convertis", value: stats.converti, icon: TrendingUp, color: "text-gold" },
              ].map((s, i) => (
                <div key={i} className="bg-dark-surface border border-border p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60 text-sm font-body">{s.label}</span>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <p className={`text-3xl font-heading ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-heading mb-4">Derniers leads</h2>
            <div className="bg-dark-surface border border-border overflow-hidden">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-secondary/20">
                  <div>
                    <p className="font-body text-sm text-foreground">{lead.name}</p>
                    <p className="text-foreground/40 text-xs font-body">{lead.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 border font-body ${statusColors[lead.status] || "text-foreground/60"}`}>
                      {lead.status}
                    </span>
                    <span className="text-foreground/30 text-xs font-body">
                      {new Date(lead.created_at).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
              ))}
              {leads.length === 0 && (
                <p className="p-8 text-center text-foreground/40 font-body text-sm">Aucun lead pour le moment</p>
              )}
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === "leads" && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-heading">Gestion des Leads</h1>
              <span className="text-foreground/40 text-sm font-body">{filteredLeads.length} leads</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Rechercher un lead..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark-surface border border-border pl-10 pr-4 py-2.5 text-foreground text-sm font-body focus:border-gold outline-none"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-dark-surface border border-border pl-10 pr-8 py-2.5 text-foreground text-sm font-body focus:border-gold outline-none appearance-none cursor-pointer"
                >
                  <option value="">Tous les statuts</option>
                  <option value="nouveau">Nouveau</option>
                  <option value="contacté">Contacté</option>
                  <option value="qualifié">Qualifié</option>
                  <option value="converti">Converti</option>
                  <option value="perdu">Perdu</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-1 bg-dark-surface border border-border overflow-hidden">
                {filteredLeads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`w-full text-left p-4 border-b border-border hover:bg-secondary/20 transition-colors ${
                      selectedLead?.id === lead.id ? "bg-secondary/30 border-l-2 border-l-gold" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-body text-sm text-foreground">{lead.name}</p>
                      <span className={`text-xs px-2 py-0.5 border font-body ${statusColors[lead.status] || ""}`}>
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-foreground/40 text-xs font-body mt-1">{lead.email}</p>
                    <p className="text-foreground/30 text-xs font-body mt-0.5">
                      {new Date(lead.created_at).toLocaleDateString("fr-FR")} — {lead.configuration || "Non spécifié"}
                    </p>
                  </button>
                ))}
                {filteredLeads.length === 0 && (
                  <p className="p-8 text-center text-foreground/40 font-body text-sm">Aucun lead trouvé</p>
                )}
              </div>

              {selectedLead && (
                <div className="w-96 bg-dark-surface border border-border p-6 space-y-6 shrink-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-lg">{selectedLead.name}</h3>
                    <button onClick={() => deleteLead(selectedLead.id)} className="text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 text-sm font-body">
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Mail className="w-4 h-4 text-gold" />
                      <a href={`mailto:${selectedLead.email}`} className="hover:text-gold">{selectedLead.email}</a>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Phone className="w-4 h-4 text-gold" />
                      <a href={`tel:${selectedLead.phone}`} className="hover:text-gold">{selectedLead.phone}</a>
                    </div>
                    {selectedLead.budget && (
                      <p className="text-foreground/60">Budget : <span className="text-gold">{selectedLead.budget}</span></p>
                    )}
                    {selectedLead.configuration && (
                      <p className="text-foreground/60">Config : <span className="text-foreground">{selectedLead.configuration}</span></p>
                    )}
                    {selectedLead.message && (
                      <div className="pt-3 border-t border-border">
                        <p className="text-foreground/40 text-xs mb-1">Message</p>
                        <p className="text-foreground/70">{selectedLead.message}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-foreground/40 font-body mb-2 uppercase tracking-wide">Changer le statut</p>
                    <div className="flex flex-wrap gap-2">
                      {["nouveau", "contacté", "qualifié", "converti", "perdu"].map((s) => (
                        <button
                          key={s}
                          onClick={() => updateLeadStatus(selectedLead.id, s)}
                          className={`text-xs px-3 py-1.5 border font-body transition-all ${
                            selectedLead.status === s
                              ? statusColors[s]
                              : "border-border text-foreground/40 hover:border-foreground/30"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-foreground/40 font-body mb-2 uppercase tracking-wide">Notes</p>
                    {selectedLead.notes && (
                      <p className="text-foreground/60 text-sm font-body mb-2 whitespace-pre-line">{selectedLead.notes}</p>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ajouter une note..."
                        className="flex-1 bg-transparent border border-border px-3 py-2 text-sm text-foreground font-body focus:border-gold outline-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
                            addNoteToLead(selectedLead.id, `[${new Date().toLocaleDateString("fr-FR")}] ${(e.target as HTMLInputElement).value}`);
                            (e.target as HTMLInputElement).value = "";
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === "offers" && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-heading">Gestion des Offres</h1>
              <button
                onClick={() => { resetOfferForm(); setShowOfferModal(true); }}
                className="border border-gold text-gold px-6 py-2.5 text-xs tracking-wide-luxury font-body flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
                NOUVELLE OFFRE
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-dark-surface border border-border overflow-hidden group">
                  {offer.images && offer.images[0] && (
                    <div className="h-48 overflow-hidden">
                      <img src={offer.images[0]} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg">{offer.title}</h3>
                      <span className={`text-xs px-2 py-0.5 border font-body ${offer.active ? "text-green-400 border-green-400/30" : "text-red-400 border-red-400/30"}`}>
                        {offer.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-gold font-heading text-xl">{offer.price} MAD</p>
                    <p className="text-foreground/60 text-sm font-body line-clamp-2">{offer.description}</p>
                    <div className="flex gap-2 text-xs text-foreground/40 font-body">
                      {offer.surface && <span>{offer.surface} m²</span>}
                      {offer.rooms && <span>• {offer.rooms} ch.</span>}
                      {offer.type && <span>• {offer.type}</span>}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => openEditOffer(offer)}
                        className="flex-1 border border-border text-foreground/60 py-2 text-xs font-body flex items-center justify-center gap-1 hover:border-gold hover:text-gold transition-all"
                      >
                        <Edit className="w-3 h-3" /> Modifier
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(offer.id)}
                        className="border border-border text-red-400/60 px-3 py-2 text-xs font-body hover:border-red-400 hover:text-red-400 transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {offers.length === 0 && (
                <div className="col-span-full bg-dark-surface border border-border p-12 text-center">
                  <FileText className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
                  <p className="text-foreground/40 font-body">Aucune offre pour le moment</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="p-8">
            <h1 className="text-2xl font-heading mb-8">Paramètres</h1>
            <div className="max-w-xl space-y-6">
              <div className="bg-dark-surface border border-border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-lg mb-1">Modifier le mot de passe</h3>
                    <p className="text-foreground/40 text-sm font-body">Changez votre mot de passe administrateur</p>
                  </div>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="border border-gold text-gold px-4 py-2 text-xs font-body flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Key className="w-4 h-4" />
                    Modifier
                  </button>
                </div>
              </div>
              <div className="bg-dark-surface border border-border p-6">
                <h3 className="font-heading text-lg mb-1">Informations du compte</h3>
                <p className="text-foreground/40 text-sm font-body mt-2">Email : bena@hills.com</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowDeleteConfirm(null)}>
          <div className="bg-dark-surface border border-border p-8 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading text-xl mb-4">Confirmer la suppression</h3>
            <p className="text-foreground/60 text-sm font-body mb-6">Êtes-vous sûr de vouloir supprimer cette offre ? Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 border border-border text-foreground/60 py-3 text-xs font-body hover:text-foreground transition-colors">
                Annuler
              </button>
              <button onClick={() => deleteOffer(showDeleteConfirm)} className="flex-1 border border-red-400 text-red-400 py-3 text-xs font-body hover:bg-red-400 hover:text-background transition-all">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowPasswordModal(false)}>
          <div className="bg-dark-surface border border-border p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading text-xl mb-6">Modifier le mot de passe</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-foreground/60 font-body uppercase tracking-wide block mb-2">Nouveau mot de passe</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none" />
              </div>
              <div>
                <label className="text-xs text-foreground/60 font-body uppercase tracking-wide block mb-2">Confirmer</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none" />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowPasswordModal(false)} className="flex-1 border border-border text-foreground/60 py-3 text-xs font-body hover:text-foreground transition-colors">
                  Annuler
                </button>
                <button onClick={handleChangePassword} className="flex-1 border border-gold text-gold py-3 text-xs font-body hover:bg-primary hover:text-primary-foreground transition-all">
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-auto" onClick={() => setShowOfferModal(false)}>
          <div className="bg-dark-surface border border-border p-8 w-full max-w-2xl my-8" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading text-xl mb-6">{editingOffer ? "Modifier l'offre" : "Nouvelle offre"}</h3>
            <div className="space-y-4 max-h-[70vh] overflow-auto pr-2">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-foreground/60 font-body uppercase tracking-wide block mb-2">Titre *</label>
                  <input type="text" value={offerForm.title} onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none" placeholder="Villa Signature" />
                </div>
                <div>
                  <label className="text-xs text-foreground/60 font-body uppercase tracking-wide block mb-2">Prix (MAD) *</label>
                  <input type="text" value={offerForm.price} onChange={(e) => setOfferForm({ ...offerForm, price: e.target.value })}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none" placeholder="4.400.000" />
                </div>
                <div>
                  <label className="text-xs text-foreground/60 font-body uppercase tracking-wide block mb-2">Surface (m²)</label>
                  <input type="text" value={offerForm.surface} onChange={(e) => setOfferForm({ ...offerForm, surface: e.target.value })}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none" placeholder="240" />
                </div>
                <div>
                  <label className="text-xs text-foreground/60 font-body uppercase tracking-wide block mb-2">Chambres</label>
                  <select value={offerForm.rooms} onChange={(e) => setOfferForm({ ...offerForm, rooms: e.target.value })}
                    className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none">
                    <option value="" className="bg-card">Sélectionner</option>
                    <option value="3" className="bg-card">3 Chambres</option>
                    <option value="4" className="bg-card">4 Chambres</option>
                    <option value="5" className="bg-card">5 Chambres</option>
                    <option value="6+" className="bg-card">6+ Chambres</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-foreground/60 font-body uppercase tracking-wide block mb-2">Type de bien</label>
                <select value={offerForm.type} onChange={(e) => setOfferForm({ ...offerForm, type: e.target.value })}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none">
                  <option value="villa" className="bg-card">Villa</option>
                  <option value="riad" className="bg-card">Riad</option>
                  <option value="appartement" className="bg-card">Appartement</option>
                  <option value="penthouse" className="bg-card">Penthouse</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-foreground/60 font-body uppercase tracking-wide block mb-2">Description</label>
                <textarea value={offerForm.description} onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                  rows={3} className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none resize-none"
                  placeholder="Description de l'offre..." />
              </div>

              <div>
                <label className="text-xs text-foreground/60 font-body uppercase tracking-wide block mb-2">Caractéristiques</label>
                <input type="text" value={offerForm.features} onChange={(e) => setOfferForm({ ...offerForm, features: e.target.value })}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none"
                  placeholder="Piscine, jardin, garage... (séparés par des virgules)" />
              </div>

              <div>
                <label className="text-xs text-foreground/60 font-body uppercase tracking-wide block mb-2">Photos</label>
                <div className="border border-dashed border-border p-4">
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" id="offer-images" />
                  <label htmlFor="offer-images" className="flex flex-col items-center gap-2 cursor-pointer text-foreground/40 hover:text-gold transition-colors">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-sm font-body">Cliquez pour ajouter des photos</span>
                  </label>
                </div>
                {offerForm.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {offerForm.images.map((img, i) => (
                      <div key={i} className="relative w-20 h-20">
                        <img src={img} alt="" className="w-full h-full object-cover border border-border" />
                        <button onClick={() => removeImage(i)} className="absolute -top-1 -right-1 bg-red-500 text-background rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setOfferForm({ ...offerForm, active: !offerForm.active })}
                  className={`w-10 h-6 rounded-full transition-colors ${offerForm.active ? "bg-green-500" : "bg-border"}`}>
                  <div className={`w-4 h-4 rounded-full bg-foreground transition-transform mx-1 ${offerForm.active ? "translate-x-4" : ""}`} />
                </button>
                <span className="text-sm font-body text-foreground/60">Offre active</span>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => { setShowOfferModal(false); resetOfferForm(); }}
                  className="flex-1 border border-border text-foreground/60 py-3 text-xs font-body hover:text-foreground transition-colors">
                  Annuler
                </button>
                <button onClick={handleSaveOffer}
                  className="flex-1 border border-gold text-gold py-3 text-xs font-body hover:bg-primary hover:text-primary-foreground transition-all">
                  {editingOffer ? "Sauvegarder" : "Créer l'offre"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
