# Assets and information to supply

Only approved, real assets should be added. The site works without any of the items below; missing fields produce no broken image, blank heading, or guessed link.

## Personal profile

- Verified LinkedIn URL and public contact email, if desired.
- A real résumé PDF suitable for public distribution; then add its path to the central profile data.
- Optional portrait with permission to publish.
- An optional social sharing image made from approved assets. Until supplied, Open Graph uses text metadata without an image.

## Projects

| Project                  | Requested assets or clarification                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Racker                   | Approved screenshots of training, nutrition and progress screens, logo, development notes, and confirmed release status. Supply store URLs only if actually published. |
| SecureFace               | Team-approved, anonymized visual examples; approved personal contribution and public research description.                                                             |
| RubikRL                  | Approved experiment visualization, development notes and an accurate description of current scope.                                                                     |
| Deepfake Detection       | Team-approved screenshots, confirmed personal contribution and any specifically approved evaluation results.                                                           |
| IdleOyun                 | Original historical screenshot, without redesigning it.                                                                                                                |
| Calculator               | Original Windows Forms screenshot.                                                                                                                                     |
| HCJEditor                | Real editor screenshot and a verified demo URL, if available.                                                                                                          |
| DinoCore: Evolution Idle | Real Unity gameplay capture and optional logo. Keep AI-assisted development attribution.                                                                               |
| Kutlumi                  | Explicitly approved, sanitized screenshots. Remove personal messages, photos and other people’s data before sharing.                                                   |
| Lina                     | Real interface screenshot and any updated public project status.                                                                                                       |

Exact project start dates and unspecified collaboration details remain unconfirmed. Only supplied years are used. No app-store availability, usage statistics, funding, individual team responsibilities, or model performance is assumed.

## Adding images

Create `src/assets/images/` when there is a real image to add. Import the image into `src/data/projects.ts`, then assign `coverImage: { src: importedImage, alt: { en: '…', tr: '…' } }` or an entry in `gallery`. Both fields accept Astro image metadata. Images are converted to WebP with responsive sizes, known dimensions and lazy loading. Use factual, meaningful alt text in both languages.

Never commit secrets, private repository source, faces without permission, personal messages, identifiable records, tokens, or API keys inside images or their metadata. Review each final exported asset before adding it. Source repository visibility is not a mechanism for hiding website content.
