
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const getdata = () => {
    const data = localStorage.getItem("user");
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
};

const Register = () => {
    const [user, setuser] = useState(getdata());
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpass] = useState("");
    const [cpass, setcpass] = useState("");
    const [nerror, setnerror] = useState("");
    const [emailerror, setemailerror] = useState("");
    const [passerror, setpasserror] = useState("");
    const [cpasserror, setcpasserror] = useState("");
    const [valide, setvalidemail] = useState("");
    const [passworderror, setpasscapass] = useState("");

    const data = useSelector(state => state.contactReducer);
    console.log("data", data);
    const dispatch = useDispatch();

    const handlesubmit = (e) => {
        e.preventDefault();

        let data = {
            name,
            email,
            password,
            cpass,
        };
        if (!name || !email || !password || !cpass) {
            if (!name) {
                setnerror("please enter name.!");
            }
            if (!email) {
                setemailerror("please enter email.!");
            }
          
            if (!password) {
                setpasserror("please enter password.!");
            }
            if (!cpass) {
                setcpasserror("please enter cpassword.!");
            }
        } else if (email.match(/^[a-zA-Z]+$/)) {
            setvalidemail("invalid email");
        }
        else if(password!==cpass){
            setpasscapass("paccword &cpassword not match");
        } else {
            dispatch({ type: "ADD_CONTACT", payload: data }) 
            setuser([...user, data]);
            alert("data added succeccfully");
            setname("");
            setemail("");
            setpass("");
            setcpass("");
        }
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
       
    }, [user]);

    return (
        <form className="form-group offset-sm-3 col-sm-5" onSubmit={handlesubmit}>
            <label>
                <b>Name:</b>
            </label>
            <input
                value={name}
                type="text"
                onChange={(e) => setname(e.target.value, setnerror(""))}
                placeholder="name"
                className="form-control"
            />
            <span
                style={{
                    fontWeight: "500",
                    color: "red",
                }}
            >
                {nerror}
            </span>

            <br />
            <label>
                <b>Email:</b>
            </label>
            <input
                value={email}
                type="text"
                onChange={(e) =>
                    setemail(e.target.value, setemailerror(""), setvalidemail(""))
                }
                placeholder="email"
                className="form-control"
            />
            <span
                style={{
                    fontWeight: "500",
                    color: "red",
                }}
            >
                {emailerror}
            </span>
            <span
                style={{
                    fontWeight: "500",
                    color: "red",
                }}
            >
                {valide}
            </span>
            <br />
            <label for="exampleInputPassword1">
                <b>Password:</b>
            </label>
            <input
                value={password}
                type="password"
                onChange={(e) =>
                    setpass(e.target.value, setpasserror(""), setpasscapass(""))
                }
                placeholder="password"
                className="form-control"
            />
            <span
                style={{
                    fontWeight: 500,
                    color: "red",
                }}
            >
                {passerror}
            </span>
            <br />
            <label >
                <b>Confirm password:</b>
            </label>
            <input
                value={cpass}
                type="password"
                onChange={(e) => setcpass(e.target.value, setcpasserror(""))}
                placeholder="confirmpassword"
                className="form-control"
            />
            <span
                style={{
                    fontWeight: "500",
                    color: "red",
                }}
            >
                {cpasserror}
            </span>
            <span
                style={{
                    fontWeight: "500",
                    color: "red",
                }}
            >
                {passworderror}
            </span>
            <br />
            <button type="submit" className="btn btn-primary offset-sm-4 my-3">
                Submit
            </button>
        </form>
    );
};

export default Register;


