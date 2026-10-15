import { format } from "date-fns";
import { join } from "path";

const BUILD_TIME = format(Date.now(), "LLLL dd, yyyy");

const BLOG_DIRECTORY = join(process.cwd(), "src", "content", "blog");
const PROJECT_DIRECTORY = join(process.cwd(), "src", "content", "project");
const RESUME_DIRECTORY = join(process.cwd(), "src", "content", "resume");

export {
  BUILD_TIME,
  BLOG_DIRECTORY,
  PROJECT_DIRECTORY,
  RESUME_DIRECTORY,
};
