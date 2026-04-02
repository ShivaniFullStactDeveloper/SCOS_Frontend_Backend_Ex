import "../../styles/common_comp_style/Footer.css";

export function FooterLogin() {
  return (
    <p className="footer-text footer-login">
      By continuing, you agree to our{" "}
      <a href="#terms" className="footer-link">
        Terms & Privacy Policy
      </a>
    </p>
  );
}

export function FooterRole() {
  return (
    <p className="footer-text">
      Can't find your role? Contact your institute administrator or email us at{" "}
      <a href="mailto:support@schoolcoreos.com" className="footer-link">
        support@schoolcoreos.com
      </a>
    </p>
  );
}