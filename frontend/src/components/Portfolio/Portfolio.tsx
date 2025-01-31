import React, { useState, useRef } from 'react';
import './Portfolio.css';
import { BountyProfileCardProps } from '../../types/Components'

const BountyProfileCard: React.FC<BountyProfileCardProps> = ({
  userName,
  netWorth,
  cash,
  profitLossOverall,
  profitLossLastChapter,
  profileImage,
  isLoggedIn
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await fetch('/api/v1/user/update-avatar', {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });

        if (!response.ok) throw new Error('Upload failed');
        
        console.log('Profile image uploaded successfully');
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
  };

  return (
    <div className="bounty-card">
      <div 
        className="bounty-image-container"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {profileImage || preview ? (
          <>
            <img
              src={preview || profileImage}
              alt="User"
              className="bounty-image"
            />
            {isLoggedIn && (
              <div 
                className={`overlay ${isHovering ? 'overlay-visible' : ''}`}
                onClick={handleUploadClick}
              >
                Change Profile Picture
              </div>
            )}
          </>
        ) : (
          <div
            className={`upload-area ${isLoggedIn ? 'clickable' : 'disabled'}`}
            onClick={isLoggedIn ? handleUploadClick : undefined}
          >
            <span>
              {isLoggedIn
                ? "Click to upload profile picture"
                : "Login / Register to set a profile picture"}
            </span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={!isLoggedIn}
        />
      </div>
      <div className="bounty-details">
        <p className="bounty-name">{userName}</p>
        <p className="bounty-net-worth">
          Net Worth: <span className="highlight">{netWorth} Bellies</span> Cash:  <span className="highlight">{cash} Bellies</span>
        </p>
        <p className="bounty-profit-loss">
          Profit/Loss Overall: <span className="highlight">{profitLossOverall}</span>{' '}
          <span className="profit-loss-last-chapter">
            (Last Chapter: <span className="highlight">{profitLossLastChapter}</span>)
          </span>
        </p>
      </div>
    </div>
  );
};

export default BountyProfileCard;