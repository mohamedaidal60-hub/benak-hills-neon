const customFetch = async (action: string, table?: string, payload?: any, match?: any, orderBy?: any) => {
  const token = localStorage.getItem('supabase.auth.token');
  const headers: any = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  
  const res = await fetch('/api/v1', {
    method: 'POST',
    headers,
    body: JSON.stringify({ action, table, payload, match, orderBy })
  });
  
  return res.json();
};

class SupabaseQueryBuilder {
  table: string;
  _orderBy: any;
  _match: any;
  
  constructor(table: string) {
    this.table = table;
  }
  
  select(query = '*') {
    return this;
  }
  
  order(col: string, { ascending }: { ascending: boolean }) {
    this._orderBy = { col, ascending };
    return this;
  }
  
  eq(col: string, val: string) {
    this._match = { col, val };
    return this;
  }
  
  async then(resolve: any, reject: any) {
    try {
      const res = await customFetch('select', this.table, null, this._match, this._orderBy);
      if (res.error) reject(res.error);
      resolve({ data: res.data || [], error: null });
    } catch(err) {
      reject(err);
    }
  }
  
  insert(payload: any) {
    return customFetch('insert', this.table, payload).then(r => ({ data: r.data, error: r.error }));
  }
  
  update(payload: any) {
    return {
      eq: (col: string, val: string) => {
         return customFetch('update', this.table, payload, { col, val }).then(r => ({ data: r.data, error: r.error }));
      }
    };
  }
  
  delete() {
    return {
      eq: (col: string, val: string) => {
         return customFetch('delete', this.table, null, { col, val }).then(r => ({ data: r.data, error: r.error }));
      }
    };
  }
}

const globalTempBase64 = new Map<string, string>();

export const supabase = {
  auth: {
    getSession: async () => {
      const res = await customFetch('session');
      return { data: { session: res.session }, error: res.error };
    },
    signInWithPassword: async (payload: any) => {
      const res = await customFetch('signInWithPassword', undefined, payload);
      if (res.error) return { data: { session: null, user: null }, error: res.error };
      if (res.session?.access_token) {
        localStorage.setItem('supabase.auth.token', res.session.access_token);
      }
      return { data: { session: res.session, user: res.user }, error: null };
    },
    signUp: async (payload: any) => {
      const res = await customFetch('signUp', undefined, payload);
      return { data: { user: res.user }, error: res.error };
    },
    updateUser: async (payload: any) => {
      const res = await customFetch('updateUser', undefined, payload);
      return { data: { user: res.user }, error: res.error };
    },
    onAuthStateChange: (cb: any) => {
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signOut: async () => {
      localStorage.removeItem('supabase.auth.token');
    }
  },
  from: (table: string) => new SupabaseQueryBuilder(table),
  storage: {
    from: (bucket: string) => {
      return {
        upload: async (path: string, file: File) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              globalTempBase64.set(path, reader.result as string);
              resolve({ data: { path }, error: null });
            };
          });
        },
        getPublicUrl: (path: string) => {
          return { data: { publicUrl: globalTempBase64.get(path) || "" } };
        }
      };
    }
  }
};