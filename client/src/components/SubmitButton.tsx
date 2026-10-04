import { useNavigation } from 'react-router-dom';

const SubmitButton = ({ formBtn, text = 'Submit' }: { formBtn?: boolean; text?: string }) => {
  const navigation = useNavigation();

  return (
    <button
      type="submit"
      className={formBtn ? 'btn btn-block form-btn' : 'btn btn-block'}
      disabled={navigation.state === 'submitting'}
    >
      {navigation.state === 'submitting' ? 'Submitting' : text}
    </button>
  );
};

export default SubmitButton;
