import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContact } from '../services/contact';
import { RootState } from '../store';
import { selectContactById } from '../store/contacts/contactSelector';
import { updateContact } from '../store/contacts/contactSlice';
import { Contact } from '../types/contactTypes';
import { LoadingStatus } from '../types/types';

export type ContactHook = {
  contact: Contact;
  loadingStatus: LoadingStatus;
}

export default function useContact(id: string): ContactHook {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = React.useState(false);
  const contact = useSelector((state: RootState) => selectContactById(state, id));

  React.useEffect(() => {
    setLoaded(false);
    fetchContact(id).then((data) => {
      dispatch(updateContact(data));
      setLoaded(true);
    });
  }, [id]);

  return {
    loadingStatus: loaded ? 'resolved' : 'loading',
    contact,
  };
}
