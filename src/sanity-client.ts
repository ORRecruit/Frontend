import { createClient } from "next-sanity";

const client = createClient({
  projectId: "8s45rij1", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is usually "production"
  useCdn: true, // `false` if you want to ensure fresh data
  token:
    "skDBoJ8zvI49c7JMRXcstUsRAqyfOkhbpqqpc4p1DauiHvgWfiHsBdTK7WOCREv6OLMrmHU3amGXEuS86tO6i9I0tvUs8LrOr0ZsO8WT0AvHAfzy4eiQt6CirDvjoGEYdYTFpf3ilRN4cab6jj4yttLxEMZjDZOrsFa68cI9r3FzkBQYhgsV",
});

export default client;
