import { useState, useEffect } from 'react';
import { Upload, FileText, Loader2, Database } from 'lucide-react';
import { uploadDataset, getDatasets } from '../services/api';

export default function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const loadData = async () => {
    try {
      setFetching(true);
      const data = await getDatasets();
      setDatasets(data);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      setErrorMsg("Only CSV files are allowed");
      e.target.value = '';
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');
      await uploadDataset(file);
      await loadData();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
      e.target.value = ''; 
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-white">Datasets</h1>
        
        <div className="relative group">
          <input 
            type="file" 
            accept=".csv"
            onChange={handleUpload}
            disabled={loading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          />
          <button 
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 group-hover:bg-indigo-500 text-white rounded-lg transition-all font-medium shadow-[0_0_15px_rgba(79,70,229,0.3)] disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
            {loading ? 'Uploading...' : 'Upload CSV'}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
          {errorMsg}
        </div>
      )}

      <div className="glass-card rounded-2xl overflow-hidden border border-slate-700/50 hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] transition-all">
        <div className="p-6 border-b border-slate-700/50 bg-slate-800/30">
          <h2 className="text-lg font-medium text-white">Uploaded Files</h2>
        </div>
        
        {fetching ? (
          <div className="p-8 text-center text-slate-400 flex justify-center">
            <Loader2 size={24} className="animate-spin" />
          </div>
        ) : datasets.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Database size={32} className="mx-auto mb-3 opacity-50" />
            <p>No datasets uploaded yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700/50">
            {datasets.map((ds, idx) => (
              <div key={idx} className="p-4 px-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors cursor-default">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-200">{ds.filename}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(ds.uploaded_at * 1000).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
