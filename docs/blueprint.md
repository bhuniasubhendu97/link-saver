# **App Name**: LinkWise

## Core Features:

- Share Intent Reception: Receive shared video links and metadata (title, description) from any app via Android Share Intents.
- Link and Metadata Extraction: Extract the video link (always available) and additional metadata like title and description.
- Offline Categorization via TFLite: Use a TensorFlow Lite model (bundled in APK) to predict the video category (Music, Sports, Education, Movies, News, Gaming, Entertainment, etc.). The LLM will use the link and description as tools to generate the appropriate categorization.
- Automatic or Manual Category Assignment: Auto-assign the category if the model confidence is >= 80%; otherwise, prompt the user to choose from a dropdown of suggested categories.
- Local Storage in Room Database: Save the link + category into a local Room/SQLite database for offline access.
- Categorized Library View: Display saved links in a library view with search, filters, and category grouping.

## Style Guidelines:

- Primary color: Deep blue (#3F51B5) for a sense of trust and knowledge.
- Background color: Light gray (#F5F5F5) to ensure readability and a clean interface.
- Accent color: Teal (#009688) for CTAs, providing a modern, engaging contrast.
- Font: 'PT Sans', a sans-serif font for clear and modern readability in both headlines and body text.
- Use Material Design icons for a consistent and intuitive user experience.
- Employ a card-based layout for displaying video links, optimizing for visual appeal and information hierarchy.
- Incorporate subtle animations for UI transitions and user feedback (e.g., when saving links).