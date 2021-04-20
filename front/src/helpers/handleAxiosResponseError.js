export default function handleAxiosResponseError(error) {
    if (error.response) {
        if (error.response.data.error)
            return(error.response.data.error);
        else if (error.response.data.message)
            return(error.response.data.message);
    } else if (error.message)
        return(error.message);
    else
        return "Error couldn't be resolve.\nPlease contact our developers."
}