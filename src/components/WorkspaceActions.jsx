import React from 'react';
import { Download, LoaderCircle, Trash2 } from 'lucide-react';

const WorkspaceActions = ({ onClear, onDownload, isGenerating = false, placement = 'desktop' }) => (
  <div className={`workspace-actions workspace-actions-${placement}`}>
    <button type="button" className="workspace-clear-button" onClick={onClear}>
      <Trash2 size={16} /> <span>Clear All</span>
    </button>
    <button type="button" className="workspace-download-button" onClick={onDownload} disabled={isGenerating}>
      {isGenerating ? <LoaderCircle className="workspace-loading-icon" size={17} /> : <Download size={17} />}
      <span>{isGenerating ? 'Generating PDF…' : placement === 'mobile' ? 'Download PDF' : 'Download'}</span>
    </button>
  </div>
);

export default WorkspaceActions;
