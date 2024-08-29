const getUserBalace = async ()=>{
    try {
        const token = localStorage.getItem("token") || ""
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.totaleBalance;
        }else{
            console.log(response.json())
        }
    } catch (error) {
        console.error('Fetching data failed:', error);
    }
}