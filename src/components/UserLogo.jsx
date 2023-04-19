const UserLogo = (img) => {
  return (
    <div className="user-profile-container">
      <div className="user-logo chat-profile">
        <img src={img.img} alt="logo" />
      </div>
    </div>
  );
};

export default UserLogo;
