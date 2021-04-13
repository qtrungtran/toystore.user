const { useSnackbar } = require('notistack');

const useNotification = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	return {
		showSuccess: message => enqueueSnackbar(message, { variant: 'success' }),
		showError: message => enqueueSnackbar(message, { variant: 'error' }),
		showWarning: message => enqueueSnackbar(message, { variant: 'warning' }),
		showInfo: message => enqueueSnackbar(message, { variant: 'info' }),
		show: message => enqueueSnackbar(message, { variant: 'default' }),
		closeSnackbar
	};
};

export default useNotification;
