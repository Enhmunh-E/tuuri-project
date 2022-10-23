const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = require("contentful").createClient({
  space: "ot7ue7caqpfv",
  accessToken: "xinOwl-WtdUiaiWBD_jOtdvyB6U7YYHtkekzWa2yzzY",
});

export async function fetchEntries() {
  const entries = await client.getEntries({ content_type: "article" });
  if (entries.items) return entries.items;
  console.log(`Error getting Entries for ${contentType.name}.`);
}

export default { fetchEntries };
