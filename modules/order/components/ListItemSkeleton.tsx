import { Box, Divider, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";

const ListItemSkeleton = () => {
  return (
    <>
      <Box padding="6" boxShadow="lg" bg="white" width="100%">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" />
      </Box>
      <Divider />
      <Box padding="6" boxShadow="lg" bg="white" width="100%">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" />
      </Box>
      <Divider />
      <Box padding="6" boxShadow="lg" bg="white" width="100%">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={3} spacing="4" />
      </Box>
    </>
  );
};

export default ListItemSkeleton;
