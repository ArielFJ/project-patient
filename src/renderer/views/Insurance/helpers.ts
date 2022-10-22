import Swal from 'sweetalert2';

export const deleteInsuranceType = (onConfirmation: () => Promise<void>): void => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this type!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then(async ({ isConfirmed }) => {
    if (isConfirmed) await onConfirmation();
  });
};
