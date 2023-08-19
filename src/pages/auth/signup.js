import Form from "@/components/auth/form";

export default function SignUp () {
    const onSubmit = async (firstName, lastName, email, password) => {
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({firstName, lastName, email, password}),
                headers: {
                    "Content-Type": "application/json"
            }
        });
        if(response.ok) {
            alert("Sign up Successful");
        }
        }   catch(err){
            console.error(er);
        }
        
    };
    return <Form signin={false} onFormSubmit={onSubmit} />
};
