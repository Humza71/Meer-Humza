import React from "react";
import {
  Box,
  Card as MuiCard,
  CardContent,
  Typography as MuiTypography,
} from "@material-ui/core";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
const Card = styled(MuiCard)(spacing);

const Typography = styled(MuiTypography)(spacing);

const OutCard = styled(Card)`
  width: ${(props) => props.cardsize.width};
  margin: 36px auto;
`;

const ReportCard = ({
  title,
  children,
  cardsize = {
    width: "950px",
  },
}) => {
  return (
    <OutCard mb={6} cardsize={cardsize}>
      <CardContent>
        <Box my={4}>
          <Typography variant="h4" color="inherit" gutterBottom>
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </OutCard>
  );
};

export default ReportCard;
