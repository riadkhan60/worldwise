import { useNavigate } from 'react-router-dom';
import Button from './Button';

function BackButton() {
  const navigateBacks = useNavigate();

  return (
    <Button
      btnType="back"
      action={(e) => {
        e.preventDefault();
        navigateBacks(-1);
      }}
    >
      Back
    </Button>
  );
}

export default BackButton;
