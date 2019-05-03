import Swal from 'sweetalert2';

export default async ({ action, onConfirm }) => {
  const dialog = await Swal.fire({
    title: 'Are you sure?',
    text: `You will not be able to recover this ${action}!`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it',
  });
  if (dialog.value) {
    await onConfirm();
    await Swal.fire({
      type: 'success',
      title: `${action} successfully deleted.`,
      showConfirmButton: false,
      timer: 1300,
    });
  }
};
