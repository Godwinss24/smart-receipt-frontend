export const useReceipt = () => {
    const config = useRuntimeConfig();
    const baseURL = config.public.apiBase;

    const createReceipt = async (token: string, file: File) => {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const formdata = new FormData();
        formdata.append("file", file);

        const requestOptions:RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        const response = await fetch(`${baseURL}/receipt`, requestOptions)
        return response;
    }

    return {
        createReceipt
    }
}