import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    let loginStatus = localStorage.getItem('loginStatus');
    if (loginStatus) {
      setError(loginStatus);
      setTimeout(function () {
        localStorage.clear();
        window.location.reload();
      }, 3000);
    }
    setTimeout(function () {
      setMsg('');
    }, 5000);
  }, [msg]);

  const handleInputChange = (e, type) => {
    setError('');
    if (type === 'user') {
      setUser(e.target.value);
      if (e.target.value === '') {
        setError('Username has been left blank');
      }
    } else if (type === 'pass') {
      setPass(e.target.value);
      if (e.target.value === '') {
        setError('Password has been left blank');
      }
    }
  };

  function loginSubmit() {
    if (user !== "" && pass !== "") {
      var url = "http://localhost/login.php";
      var headers = {
        "Content-Type": "application/json",
      };
      var Data = {
        user: user,
        pass: pass,
      };
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (
            response[0].result === "Invalid username!" ||
            response[0].result === "Invalid password!"
          ) {
            setError(response[0].result);
          } else {
            setMsg(response[0].result);
            localStorage.setItem("login", true);
            navigate("/AdminDashboard", { replace: true });
          }
        })
        .catch((err) => {
          setError(err.toString());
          console.log(err);
        });
    } else {
      setError("All fields are required!");
    }
  }
  
  

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    justifyItems: 'flex-start',
    borderRadius: '5px',
    padding: '30px',
    boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.7)'
  };

  const inputStyle = {
    marginTop: '0.5rem',
    fontSize: '1rem',
    width: '300px',
    border: '1px solid gray',
    borderRadius: '5px',
    padding: '0.5rem'
  };

  const buttonStyle = {
    marginTop: '0.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem',
    background: 'green',
    color: 'white',
    cursor: 'pointer'
  };

  const labelStyle = {
    fontSize: 'small',
    marginTop: '0.5rem'
  };

  const pStyle = {
    color: 'blue',
    cursor: 'pointer'
  };

  const errorStyle = {
    color: 'red',
    marginTop: '0.5rem'
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form style={formStyle}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={user}
            onChange={(e) => handleInputChange(e, 'user')}
            style={inputStyle}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={pass}
            onChange={(e) => handleInputChange(e, 'pass')}
            style={inputStyle}
          />
        </label>
        <button type="button" onClick={loginSubmit} style={buttonStyle}>
          Log In
        </button>
        {error && <p style={errorStyle}>{error}</p>}
      </form>
    </div>
  );
}

export default AdminLogIn;
