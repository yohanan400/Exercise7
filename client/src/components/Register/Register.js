export default function Register() {

    const handleSubmit = async (event) => {
        event.preventDefault();

        //TODO: VERIFAY PASSWORD AND SEND TO SERVER.

        const full_name = document.forms[0][0].value;
        const user_name = document.forms[0][1].value;
        const email = document.forms[0][2].value;
        const password = document.forms[0][3].value;
        const password2 = document.forms[0][4].value;

        if (password === password2) {

            //preper data
            let formData = new FormData();
            formData.append('fullname', full_name);
            formData.append('username', user_name);
            formData.append('email', email);
            formData.append('password', password);


            const result = await fetch("http://localhost:3001/users/register", {
                method: "POST",
                body: formData
            })

            const resultObject = await result.json();

            alert(resultObject);
        } else {
            alert("please enter the same password!");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <lable>שם מלא:</lable>
                    <input type="text" name="fullName" required />
                </div>
                <div>
                    <lable>שם משתמש:</lable>
                    <input type="text" name="username" required />
                </div>
                <div>
                    <lable>דוא"ל:</lable>
                    <input type="text" name="email" required />
                </div>
                <div>
                    <lable>סיסמא:</lable>
                    <input type="text" name="password" required />
                </div>
                <div>
                    <lable>אימות סיסמא:</lable>
                    <input type="text" name="verify-password" required />
                </div>
                <div className="button-container">
                    <button type="submit">הרשם</button>
                </div>
            </form>
        </>
    )
}