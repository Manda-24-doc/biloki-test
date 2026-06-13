import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';

export default function ConfirmDeleteModal({
    show,
    title = 'Supprimer',
    message = 'Voulez-vous vraiment supprimer cet élément ? Cette action est irréversible.',
    confirmLabel = 'Supprimer',
    processing = false,
    onClose,
    onConfirm,
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="px-6 py-5">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">{message}</p>

                <div className="mt-6 flex items-center justify-end gap-3">
                    <SecondaryButton type="button" onClick={onClose}>
                        Annuler
                    </SecondaryButton>
                    <DangerButton
                        type="button"
                        disabled={processing}
                        onClick={onConfirm}
                    >
                        {processing ? 'Suppression...' : confirmLabel}
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}
