import * as React from 'react';
import { useParams } from 'react-router';
import useContact from '../../hooks/useContact';

export default function ContactViewer() {
  const params = useParams();
  const { loadingStatus, contact } = useContact(params.id);

  if (loadingStatus !== 'resolved') {
    return <span>Loading...</span>;
  }

  return (
    <h1>{contact.id}</h1>
  );
}
