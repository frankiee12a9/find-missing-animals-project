import { Chip, styled } from '@mui/material';
import { Tag } from 'app/models/tag';
import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface Props {
  data: Tag;
  handleDelete?: (data: Tag) => void;
}

export default function AppChipIcon({ data, handleDelete }: Props) {
  return (
    <ListItem key={data.id}>
      <Chip
        // icon={}
        title={`click to check all posts related to ${data.tagName}`}
        label={data.tagName}
        component={Link}
        to={`/tags/${data.tagName}`}
        onDelete={handleDelete!(data!)!}
      />
    </ListItem>
  );
}
