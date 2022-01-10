import { WhiteText } from '@/ui'

const Terms = () => (
  <a href="https://fonoster.com/" target="_blank" rel="noopener noreferrer">
    Terms
  </a>
)

const Privacy = () => (
  <a href="https://fonoster.com/" target="_blank" rel="noopener noreferrer">
    Privacy Policy.
  </a>
)

export const PoliciesOfUse = () => (
  <WhiteText className="my-7">
    By signing, I agree to Fonoster’s <Terms /> and <Privacy />
  </WhiteText>
)
