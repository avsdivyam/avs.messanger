interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-md shadow-md p-6 w-full max-w-md">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div>{children}</div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="text-blue-600 hover:underline">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
