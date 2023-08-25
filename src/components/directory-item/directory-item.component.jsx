import {
  DirectoryItemContainer,
  DirectoryItemBody,
  BackgroundImage,
} from "./directory-item.styles";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(route);
  };

  return (
    <DirectoryItemContainer onClick={handleNavigation}>
      <BackgroundImage imageUrl={imageUrl} />
      <DirectoryItemBody>
        <h2>{title}</h2>
        <p> Show Now</p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
