import React from 'react';
import { Label } from 'semantic-ui-react';

const TopTechTag = (prop) => {
  const { info } = prop;
  return (
    <Label style={{ marginBottom: 2 }} size='medium' color='black'>
      {info}
    </Label>
  );
};

export default TopTechTag;
