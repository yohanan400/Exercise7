export default function Contact() {

    const submitted = () => {
        return (
            <>
                <div className="text-2xl">Thank you!</div>
                <div className="text-md">We'll be in touch soon.</div>
            </>
        );
    }

    return (
        <>
            <form
                onSubmit={submitted()}
                method="POST"
            >
                <div>
                    <input
                        type="text"
                        placeholder="Your name"
                        name="name"
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Your message"
                        name="message"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                    >
                        שלח הודעה
                    </button>
                </div>
            </form>
        </>
    )
}