flowchart TD
  Start[Start] --> Home[Home Page]
  Home -->|click Services| Services[Services Page]
  Home -->|click Gallery| Gallery[Gallery Page]
  Home -->|click Contact| Contact[Contact Page]
  Home -->|tap Hamburger| MobileMenu[Mobile Menu]
  Services -->|header nav| Home
  Gallery -->|header nav| Home
  Contact -->|header nav| Home
  Contact -->|submit form| Validation{Valid Form}
  Validation -->|valid| Success[Submission Success]
  Validation -->|invalid| Contact
  Success --> Contact
  Gallery -->|image load error| ImageError[Image Error Placeholder]
  Contact -->|network error| SubmitError[Submission Error Notification]
  Home -->|wrong url| NotFound[Not Found Page]