import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { IoCopy } from "react-icons/io5";
import { HiViewGridAdd } from "react-icons/hi";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const passwordRef = useRef();
  const [show, setShow] = useState(true);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords)
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast.success("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showIcon = () => {
    {
      passwordRef.current.type === "password"
        ? (passwordRef.current.type = "text")
        : (passwordRef.current.type = "password");
    }
    setShow(!show);
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {

      await fetch("http://localhost:3000/", {method: "DELETE" , headers:{"Content-Type": "application/json"},  body:JSON.stringify( {id: form.id })})

      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);

      await fetch("http://localhost:3000/", {method: "POST" , headers:{"Content-Type": "application/json"},  body:JSON.stringify( { ...form, id: uuidv4() })})
      // localStorage.setItem(
      //   "password",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      setform({ site: "", username: "", password: "" });
      toast.success("Password Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: Password not saved!");
    }
  };

  const deletePassword = async(id) => {
    console.log("Deleting the password with id", id);
    let c = confirm("Do you really want to delete this password?");

    if (c) {
      const updatedPasswords = passwordArray.filter((item) => item.id !== id);

      setpasswordArray(updatedPasswords);
      let res = await fetch("http://localhost:3000/", {method: "DELETE" , headers:{"Content-Type": "application/json"},  body:JSON.stringify( {id })})

      // localStorage.setItem("password", JSON.stringify(updatedPasswords));

      toast.success("Password deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    console.log("editing the password with id", id);
    setform({...passwordArray.filter(i => i.id === id)[0] , id: id});
    setpasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#D1FAE5,transparent)]"></div>
      </div>

      <div className="p-3 md:mycontainer min-h-[81.2vh]">
        <h1 className="text-4xl text-slate-800 font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className="flex flex-col  p-4 gap-4 text-black items-center">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full px-3 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-8 ">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full px-3 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full px-3 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                onClick={showIcon}
                className="absolute pt-1 cursor-pointer pr-1 right-0  "
              >
                {" "}
                {show ? (
                  <BiSolidShow className="text-2xl text-green-600" />
                ) : (
                  <BiSolidHide className="text-2xl text-green-600" />
                )}
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center text-[18px] bg-green-500 rounded-full hover:bg-green-400 px-3 py-2 border border-green-800 gap-1 w-fit"
          >
            {" "}
            <HiViewGridAdd className="text-2xl" /> Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Yours Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-9">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" border text-center  border-white  gap-3  py-2 ">
                        <div className="flex gap-3 justify-center   items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="pt-1 cursor-pointer copyIcon"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <IoCopy />
                          </div>
                        </div>
                      </td>
                      <td className=" border text-center  border-white  gap-3  py-2 ">
                        <div
                          className="flex gap-3 justify-center items-center"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          {item.username}

                          <div className="pt-1 cursor-pointer copyIcon">
                            <IoCopy />
                          </div>
                        </div>
                      </td>
                      <td className=" border text-center  border-white   py-2 ">
                        <div className="flex gap-3  justify-center   items-center">
                          {"*".repeat(item.password.length)}
                          <div
                            className="pt-1 cursor-pointer copyIcon"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <IoCopy />
                          </div>
                        </div>
                      </td>
                      <td className=" border text-center  border-white   py-2 ">
                        <span className="flex gap-2  justify-center   items-center">
                          <FaEdit
                            onClick={() => {
                              editPassword(item.id);
                            }}
                            className="cursor-pointer text-xl"
                          />
                          <MdDelete
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                            className="cursor-pointer text-2xl"
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
