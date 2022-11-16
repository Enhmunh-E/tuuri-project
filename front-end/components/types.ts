export type ArticleType = {
  fields: {
    title: string;
    coverPic: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    eventDate: number;
    readTime: number;
    topic: string[];
    backgroundImage: {
      fields: {
        description: string;
        file: {
          url: string;
        };
        title: string;
      };
    };
    blocks: BlockType[];
  };
  sys: {
    contentType: {
      sys: {
        id: string;
      };
    };
  };
};

export type BlockType = {
  image?: {
    fields: {
      description: string;
      file: {
        url: string;
      };
      title: string;
    };
  };
  // texts?: {
  //   fields: {
  //     text: {
  //       fields: {
  //         text: string;
  //       };
  //     };
  //   };
  // }[];
};
