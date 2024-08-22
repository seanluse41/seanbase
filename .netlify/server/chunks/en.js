const nav_blog = "Blog";
const nav_gamedev = "GameDev";
const nav_kintone = "Kintone Plugins";
const nav_hire = "Hire";
const main_name = "Sean Luse";
const main_subtitle = "Developer in Tokyo, working on Web Development, Game Development, and Kintone Customizations. Click on a project, read my dumb blog... the possibilities are endless!";
const related_info = "Related Info";
const related_blog_posts = "Related Blog Posts (Dev Talk)";
const check_out_github = "Check it out on Github!";
const buy_now = "Buy Now";
const month = "month";
const payment_card_header = "kGuide - Start using, or unsubscribe, at any time, no extra fees";
const kGuide_features1 = "Create onboarding tours with no-code drag and drop.";
const kGuide_features2 = "i18n support for English and Japanese";
const kGuide_features3 = "Support for all Kintone fields, dropdowns and menus";
const kGuide_features4 = "Permissions based guide creation. Limit guide creation to App Admins";
const kGuide_features5 = "No App limitation, no user limitations.";
const kGuide_features6 = "Customer Support Responses within 24 hours";
const kGuide_features7 = "A security review before installation can be conducted. Please contact us via email.";
const payment_card_subscribe_now = "Subscribe Now";
const payment_card_inquiry = "Get More Information First";
const commerce_disclosure_title = "Commercial Disclosure";
const legal_name = "Legal Name";
const legal_name_value = "Seanco";
const address = "Address";
const address_value = "114-0022 Tokyo-to Kita-ku Oji-honcho 2-15-7";
const phone_number = "Phone Number";
const phone_number_value = "(+81)090-9141-0841";
const email_address = "Email Address";
const email_address_value = "seanluse41@gmail.com";
const head_of_operations = "Head of Operations";
const head_of_operations_value = "Sean Luse";
const additional_fees = "Additional Fees";
const additional_fees_value = "No additional fees";
const exchanges_returns_policy = "Exchanges & Returns Policy";
const exchanges_returns_policy_value = "No exchanges or returns";
const delivery_times = "Delivery Times";
const delivery_times_value = "Not applicable";
const accepted_payment_methods = "Accepted Payment Methods";
const accepted_payment_methods_value = "Credit Card";
const payment_period = "Payment Period";
const payment_period_value = "Automatically Monthly";
const price = "Price";
const price_value = "Price Depends on Product";
const contact_form_title = "Contact Us";
const contact_form_name = "Your Name";
const contact_form_company = "Company Name";
const contact_form_email = "Email Address";
const contact_form_phone = "Phone Number (Optional)";
const contact_form_submit = "Submit";
const contact_form_website = "Website";
const contact_form_submitting = "Submitting...";
const contact_form_thank_you = "Thank you for your submission!";
const contact_form_error = "There was an error submitting the form. Please try again.";
const payment = {
  title: "Enter Payment Details",
  name: "Cardholder Name",
  namePlaceholder: "John Doe",
  email: "Email",
  emailPlaceholder: "name@company.com",
  phone: "Phone Number",
  phonePlaceholder: "555-0000-0000",
  cardInfo: "Credit Card Information",
  payNow: "Subscribe",
  processing: "Processing..."
};
const email = {
  required: "Please enter an email address.",
  invalid: "Please enter a valid email address."
};
const card = {
  errorPrefix: "Card error:"
};
const error = {
  title: "An error occurred",
  cancel: "Cancel",
  contactSupport: "Contact Support"
};
const subscriptionSuccess = {
  title: "Subscription Successful",
  thankYou: "Thank you for your subscription, {name}!",
  details: "Subscription Details",
  email: "Email",
  phone: "Phone",
  amount: "Amount",
  nextBilling: "Next Billing Date",
  confirmation: "You will receive a confirmation email shortly.",
  downloadReceipt: "Download Receipt",
  receiptDownloaded: "Your receipt has been downloaded.",
  noData: "No subscription data available. Please contact support if you believe this is an error.",
  nextStepsTitle: "Next Steps",
  nextSteps: {
    step1: "An email will be sent to {email}",
    step2: "The email will contain the kGuide Plugin in .zip format, and your secret key.",
    step3: "In your Kintone environment, install the plugin on the Kintone Administration page.",
    step4: "Then, install the plugin to as many Apps as you want.",
    step5: "On the App's plugin settings page, click the cog wheel.",
    step6: "Enter your secret key from the email into the subscription key field.",
    step7: 'Click on "Create Repository App" to create the repository for guides. This will create a new Kintone App, and only needs to be done once.',
    step8: "Update your App settings, and create your first guide.",
    step9: "Contact customer support at any time at seanluse41@gmail.com or via the Customer Support Button on the Plugin Configuration Settings Screen."
  }
};
const en = {
  nav_blog,
  nav_gamedev,
  nav_kintone,
  nav_hire,
  main_name,
  main_subtitle,
  related_info,
  related_blog_posts,
  check_out_github,
  buy_now,
  month,
  payment_card_header,
  kGuide_features1,
  kGuide_features2,
  kGuide_features3,
  kGuide_features4,
  kGuide_features5,
  kGuide_features6,
  kGuide_features7,
  payment_card_subscribe_now,
  payment_card_inquiry,
  commerce_disclosure_title,
  legal_name,
  legal_name_value,
  address,
  address_value,
  phone_number,
  phone_number_value,
  email_address,
  email_address_value,
  head_of_operations,
  head_of_operations_value,
  additional_fees,
  additional_fees_value,
  exchanges_returns_policy,
  exchanges_returns_policy_value,
  delivery_times,
  delivery_times_value,
  accepted_payment_methods,
  accepted_payment_methods_value,
  payment_period,
  payment_period_value,
  price,
  price_value,
  contact_form_title,
  contact_form_name,
  contact_form_company,
  contact_form_email,
  contact_form_phone,
  contact_form_submit,
  contact_form_website,
  contact_form_submitting,
  contact_form_thank_you,
  contact_form_error,
  payment,
  email,
  card,
  error,
  subscriptionSuccess
};
export {
  accepted_payment_methods,
  accepted_payment_methods_value,
  additional_fees,
  additional_fees_value,
  address,
  address_value,
  buy_now,
  card,
  check_out_github,
  commerce_disclosure_title,
  contact_form_company,
  contact_form_email,
  contact_form_error,
  contact_form_name,
  contact_form_phone,
  contact_form_submit,
  contact_form_submitting,
  contact_form_thank_you,
  contact_form_title,
  contact_form_website,
  en as default,
  delivery_times,
  delivery_times_value,
  email,
  email_address,
  email_address_value,
  error,
  exchanges_returns_policy,
  exchanges_returns_policy_value,
  head_of_operations,
  head_of_operations_value,
  kGuide_features1,
  kGuide_features2,
  kGuide_features3,
  kGuide_features4,
  kGuide_features5,
  kGuide_features6,
  kGuide_features7,
  legal_name,
  legal_name_value,
  main_name,
  main_subtitle,
  month,
  nav_blog,
  nav_gamedev,
  nav_hire,
  nav_kintone,
  payment,
  payment_card_header,
  payment_card_inquiry,
  payment_card_subscribe_now,
  payment_period,
  payment_period_value,
  phone_number,
  phone_number_value,
  price,
  price_value,
  related_blog_posts,
  related_info,
  subscriptionSuccess
};
