export type ArticleType = {
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

export type BlockType = {
  fields: {
    image?: {
      fields: {
        description: string;
        file: {
          url: string;
        };
        title: string;
      };
    };
    text?: string;
  };
};
