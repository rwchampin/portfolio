import {
  InstagramLogoIcon,
  TwitterLogoIcon,
  VideoIcon,
  HeartFilledIcon
} from "@radix-ui/react-icons";
export default function Footer() {
  return (
    <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
      <p className="text-gray-500">
        Made with{" "}<HeartFilledIcon className="inline-block h-4 w-4 text-red-500" />{" "} by{" "}Ryan The Developer
      </p>
    </div>
  );
}
