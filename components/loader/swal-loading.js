import Swal from "sweetalert2";

export const swalLoading = props => {
    Swal.fire({
        title: 'Wait ...',
        onBeforeOpen () {
            Swal.showLoading ()
        },
        onAfterClose () {
            Swal.hideLoading()
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false
    });
}
