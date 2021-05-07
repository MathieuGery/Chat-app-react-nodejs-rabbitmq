export default function handleAxiosMultipleResponseError(error) {
    if (error.response) {
        if (error.response.data.errors)
            return (error.response.data.errors.errors);
    } else
        return ["Error couldn't be resolve.\nPlease contact our developers."];
}