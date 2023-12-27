import "./userProfile.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateProfile } from "../../feautures/Auth/AuthSlice";

function UserProfile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isChange, setIsChange] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    setIsChange(false);
  }, [user.profile]);

  useEffect(() => {
    const sendFile = async () => {
      try {
        dispatch(updateProfile({ file: file, id: user._id }));
      } catch (error) {
        console.log(error);
      }
    };
    if (file) {
      sendFile();
    }
  }, [file, dispatch, user._id]);
  return (
    <section className="user-profile">
      <div className="profile-container">
        <div className="profile-img-container">
          {user.profile?.filename ? (
            <img
              src={`http://localhost:5000/profile/${user.profile.filename}`}
              alt="got"
              className="profile"
            />
          ) : (
            <>
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt="not"
                  className="profile"
                />
              </div>
            </>
          )}
        </div>

        <button className="btn" onClick={() => setIsChange(!isChange)}>
          {user.profile?.filename ? "Change" : "Add"}
        </button>
        {isChange && (
          <input
            className="inputfield"
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.svg,.avif"
            onChange={(e) => setFile(e.target.files[0])}
          />
        )}
        <h1 className="profile-info">{user.name}</h1>
        <h4 className="profile-info">{user.email}</h4>
        <h4 className="profile-info">{user.phone}</h4>
      </div>
    </section>
  );
}

export default UserProfile;
