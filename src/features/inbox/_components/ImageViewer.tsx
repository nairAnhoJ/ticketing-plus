

interface Props {
  showImageViewer: boolean;
  id: number;
  type: string;
  file: string;
  onClose: () => void;
}

function ImageViewer({showImageViewer, id, type, file, onClose}: Props) {

  const extension = file.slice(file.lastIndexOf(".") + 1);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm  transition-opacity duration-500 ${ showImageViewer ? "opacity-100" : "opacity-0 pointer-events-none" }`} onClick={onClose}>
      <div className={`relative max-h-9/10 max-w-9/10 bg-white border-white/8 shadow-2xl shadow-black/60 ease-in-out transition-transform duration-500 ${ showImageViewer ? "translate-y-0 scale-100" : "translate-y-full scale-0" }`} onClick={(e) => e.stopPropagation()} >
      {
        extension === 'pdf' ? (
          <iframe src={`${import.meta.env.VITE_BASE_URL}/tp-attachments/${id}/${type}/${file}`} className="w-[90vw] h-[90vh]" title="PDF Viewer" />
        ) : (
          <img src={`${import.meta.env.VITE_BASE_URL}/tp-attachments/${id}/${type}/${file}`} className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain" />
        )
      }
      </div>
      <button onClick={onClose} className="absolute top-3 right-3 p-3 bg-white/20 text-white hover:text-white/80 transition-colors -mr-1 border-none cursor-pointer rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  )
}

export default ImageViewer