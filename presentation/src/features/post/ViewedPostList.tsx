import { Timeline } from '@mui/icons-material';
import {
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { LastViewedPost } from '../../app/models/post';

interface Props {
  viewedPosts: LastViewedPost[];
}

export default function ViewedPostList({ viewedPosts }: Props) {
  return (
    <>
      {/* <Timeline position="alternate">
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            09:30 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Eat</TimelineContent>
        </TimelineItem>
      </Timeline> */}
      <TimelineItem>
        {viewedPosts.map((aViewedPost: LastViewedPost, idx) => {
          if (idx >= 5) return;
          return (
            <TimelineItem>
              <div key={aViewedPost.id}>
                <ListItem
                  component={Link}
                  to={`/posts/${aViewedPost.id}`}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={`${aViewedPost.photos?.[0].url}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={aViewedPost.title}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        {aViewedPost.content.length > 50
                          ? `${aViewedPost.content.substring(0, 50)}...`
                          : aViewedPost.content}
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            </TimelineItem>
          );
        })}
      </TimelineItem>
    </>
  );
}
