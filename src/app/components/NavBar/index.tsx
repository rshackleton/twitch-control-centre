import { Flex, Link } from '@chakra-ui/core';
import { Link as RouterLink } from '@reach/router';
import React, { ReactNode } from 'react';

type NavbarItem = {
  path: string;
  text: string;
};

interface NavbarProps {
  post?: ReactNode;
  pre?: ReactNode;
  items: NavbarItem[];
}

const Navbar: React.FC<NavbarProps> = ({ pre, items, post }) => {
  return (
    <Flex alignItems="flex-start" direction="row">
      {pre}

      {items.map((item) => (
        <Link key={item.path} as={RouterLink} to={item.path} p={4}>
          {item.text}
        </Link>
      ))}

      {post}
    </Flex>
  );
};

export default Navbar;
