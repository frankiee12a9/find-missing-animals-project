import React from 'react';
import {
  Typography,
  Button,
  Dialog,
  List,
  Avatar,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from 'react-share';

interface Props {
  currentUrl: string;
  open: boolean;
  cancelShare: () => void;
}

export default function PostShareDialog({
  currentUrl,
  open,
  cancelShare,
}: Props) {
  return (
    <Dialog onClose={cancelShare} open={open}>
      <DialogTitle>SNS 클릭하여 공유하실 수 있습니다.</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem button>
          <ListItemAvatar>
            <FacebookShareButton
              style={{ marginRight: '21px' }}
              url={currentUrl}
            >
              <FacebookIcon
                size={48}
                round={true}
                borderRadius={24}
              ></FacebookIcon>
            </FacebookShareButton>
          </ListItemAvatar>
          <ListItemText primary={'Facebook에서 공유'} />
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <TwitterShareButton
              style={{ marginRight: '20px' }}
              url={currentUrl}
            >
              <TwitterIcon
                size={48}
                round={true}
                borderRadius={24}
              ></TwitterIcon>
            </TwitterShareButton>
          </ListItemAvatar>
          <ListItemText primary={'Twitter에서 공유'} />
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <LineShareButton style={{ marginRight: '20px' }} url={currentUrl}>
              <LineIcon size={48} round={true} borderRadius={24}></LineIcon>
            </LineShareButton>
          </ListItemAvatar>
          <ListItemText primary={'LINE에서 공유'} />
        </ListItem>
      </List>
    </Dialog>
  );
}
