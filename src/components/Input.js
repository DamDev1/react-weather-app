import { FaSearch  } from "react-icons/fa";

function Input({ test, submit, func }){
  return (
    <form className="inputContainer" onSubmit={submit}>
        <input type="text" placeholder="Input Your location" className="input_field" onChange={test} />

        <span className="search-icon">
            <FaSearch className="search" onClick={func}/>
        </span>
    </form>
  )
}

export default Input