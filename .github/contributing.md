# Deals for Devs Contribution Guide

Thank you for expressing interest to contribute to the Deals for Devs repo! The intention with this document is to give every individual the information needed to confidently work on the Deals for Dev repo and ensure that each contribution follows the same standard to allow consistent updates from the community.

_Note:_ any pull request created for an issue that already has someone else assigned **will be closed without review**.

## Table of Contents
- [Deals for Devs Contribution Guide](#deals-for-devs-contribution-guide)
  - [Table of Contents](#table-of-contents)
  - [Label Meanings](#label-meanings)
    - [Status Labels](#status-labels)
  - [When to Contribute](#when-to-contribute)
    - [Check Before Doing Anything](#check-before-doing-anything)
    - [Being Assigned an Issue](#being-assigned-an-issue)
    - [Creating an Issue](#creating-an-issue)
    - [Setting Up Your Local Clone](#setting-up-your-local-clone)
    - [Working on an Issue](#working-on-an-issue)
    - [Opening a Pull Request](#opening-a-pull-request)
  - [Further Help](#further-help)

## Label Meanings

The labels that get applied to issues and PRs in our repos have specific meanings and are broken into two categories: status and type. An issue/PR should only ever have one status label, but can have multiple type labels. The following isn't a complete list, but rather a list of the labels that are more universal across all of our repos.

### Status Labels
* **Ally**: Code is not up to WCAG standards
* **Bug**: Something isn't working
* **Documentation**: Improvements or additions to documentation
* **Duplicate**: This issue or pull request already exists
* **Enhancement**: Suggesting improvements to existing features
* **Feature**: Requests for new features
* **Good first issue**: Good for newcomers
* **Help Wanted**: Extra attention is needed
* **High Priority**: This issue/PR is crucial
* **Medium Priority**: This issue/PR is could lead to a High Priority
* **Low Priority**: This issue/PR does not need immediate attention
* **Maintenance**: Codebase maintenance tasks like refactoring or dependency updates
* **Questions**: Further information is requested
* **Won't fix**: This will not be worked on

## When to Contribute

**No Issue is too Small**: We understand that some people may be skeptical to contribute to an open source project. It can be frightening to step into a project that is already five or six years in it's life span, or just beginning. However there is one thing to always remember, "no issue is too small"! Whether it be a typo or a major bug fix any help is always grately appreciated it! Plus as you get more comfortable with the open source work flow you will begin to want to contribute to more complex tasks!

### Check Before Doing Anything

It's important that you look through any open [issues](https://github.com/Learn-Build-Teach/deals-for-devs/issues) or [pull requests](https://github.com/Learn-Build-Teach/deals-for-devs/pulls) in our repo before attempting to submit a new issue or work on a change, regardless of the complexity. This will help avoid any duplicates from being made, as well as prevent more than one person working on the same thing at the same time.

If your issue already exists in an open issue or PR, but you feel there are details missing, comment on the existing issue/PR to let those involved know of those missing details.

### Being Assigned an Issue

If you would like to work on a specific issue within our repo:

1) Find an issue that is not currently assigned to anyone.
    * A couple of good places to start are issues with the `Status: Help Wanted` or `Type: Good First Issue` labels. You can filter the issues list to only show ones with these (or any) specific labels to make them easier to find.

2) Ask to be assigned the issue by a maintainer.
    * **If you are not a maintainer, do not give others permission to work on an issue**

3) **Wait to be assigned the issue before starting any work**.

4) After being assigned, address each item listed in the acceptance criteria, if any exist.
   * If an issue doesn't have any acceptance criteria, feel free to go about resolving the issue however you wish. You can also ask the maintainer that assigned you the issue if there are any specific acceptance criteria.

### Creating an Issue

1. If you would like to make a simple change that is not part of an existing issue, you are welcome to skip the next step and just submit a PR with your proposed change(s).

2. Create a new issue and **read the issue template in its entirety and fill out all applicable sections**. If you aren't sure how to create an issue, you can read the GitHub documentation on [creating an issue from a repository](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue#creating-an-issue-from-a-repository).
   * The title of the issue must follow the format described in the issue template.
   * If you would like to be assigned the issue you are creating, complete the applicable checkbox in the issue template. Note that this does not guarantee that you will be assigned the issue, but rather it lets maintainers know that you are interested.
   * The more information you are able to provide in your issue, the better.

### Setting Up Your Local Clone

**Important:**
Before you begin working on an issue please follow these steps to setup your working environment:

1. Fork the repo to your own GitHub account. If you don't know how to do so, follow the GitHub documentation on how to [fork a repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

2. Clone the forked repo to your local machine with one of the commands below. Be sure the `<your username>` text is replaced with your actual GitHub username, and the `<repo name>` with the actual repo name. You can also read the GitHub documentation on [cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

    ```bash
    # If you have SSH set up with Git:
    git clone git@github.com:<your username>/<repo name>.git
    # Otherwise for HTTPS:
    git clone https://github.com/<your username>/<repo name>.git

    # An example:
    git clone git@github.com:BryanF1nes/deals-for-devs.git
    ```

3. `cd` into the directory of your local clone, then set the upstream remote so you can keep your local clone synced with Deals for Devs original repo. The `<repo name>` below should be the same as the one you used when creating your local clone in the previous step.

    ```bash
    # If you have SSH set up with Git:
    git remote add upstream git@github.com:<their username>/<repo name>.git
    # Otherwise for HTTPS:
    git remote add upstream https://github.com/<their username>/<repo name>.git

    # An example:
    git remote add upstream git@github.com:Learn-Build-Teach/deals-for-devs.git
    ```

### Working on an Issue

Once you have the repo forked and cloned, the upstream remote has been set, and you are in the `dev` branch you can begin working on your issue:

1. Create a new branch off of the `dev` branch (unless given specific instructions), replacing the `<your branch name>` with an actual branch name that briefly explains the purpose of the branch in some way:

    ```bash
    git checkout -b <your branch name>

    # Some examples:
    git checkout -b fix_details_page
    git checkout -b fix_main_page_bug
    git checkout -b feat_details_page
    ```

2. Add commits as you work on your issue using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary), replacing the `<your commit message>` text with your actual commit message:

   ```bash
   git commit -m "<your commit message>"

   # An example:
   git commit -m "docs: corrected spelling of FEAUTRE"
   ```

3. Make sure to sync your work with the remote `dev` branch unless the maintainer has given specific instructions:

    ```bash
    # Fetching the most updated copy from dev branch
    git fetch upstream dev

    # Merging the copy to your local main
    git merge
    ```

4. Push your branch to your forked repo, replacing the `<your branch name>` with the branch you've been working on locally:

    ```bash
    git push origin <your branch name>

    # An example:
    git push origin feat_details_page
    ```

### Opening a Pull Request

1. After pushing your changes, go to your forked repo on GitHub and click the "Compare & pull request" button. If you have multiples of this button, be sure you click the one for the correct branch.

> PRs should be made to the `dev` branch.

   * If you don't see this button, you can click the branch dropdown menu and then select the branch you just pushed from your local clone:

      ![GitHub branch dropdown menu](https://user-images.githubusercontent.com/70952936/150646139-bc080c64-db57-4776-8db1-6525b7b47be2.jpg)

   * Once you have switched to the correct branch on GitHub, click the "Contribute" dropdown and then click the "Open pull request" button.

2. **Read the PR template in its entirety before filling it out and submitting a PR**. Not filling out the template correctly will delay a PR getting merged.
   * If a checkbox is not required and is not applicable to your PR, do not complete it.
   * The title of the PR must follow the format described in the PR template.
   * If the PR is meant to close an open issue, you must link that issue in Step 1 of the PR template. This can be done either by replacing the `XXXXX` with the issue number, e.g. `Closes #2013`, or if the issue is in another TOP repo replacing the `#XXXXX` with the URL of the issue, e.g. `Closes https://github.com/Learn-Build-Teach/deals-for-devs/issues/XXXX`. This streamlines the issue closing process, as an issue that is linked to a PR will be closed when that PR gets merged.
   * If the PR is not part of an open issue, be sure to describe the reason(s) for the change(s) in more detail in Step 1 of the PR template, as well as outlining the changes made in the PR in Step 2.

3. At this point a maintainer will either leave general comments, request changes, or approve and merge your PR.
   * It is important to respond to any comments or requested changes in a timely manner, otherwise your PR may be closed without being merged due to inactivity.
   * After pushing any requested changes to the branch you opened the PR with, be sure to re-request a review from the maintainer that requested those changes at the top of the right sidebar (this will only appear when a maintainer is assigned as a reviewer or has requested changes):

      ![Reviewers section of GitHub's sidebar](https://user-images.githubusercontent.com/70952936/150647064-4fdd59d1-82a4-4f18-894d-0e43a5ee0ffb.jpg)

## Further Help
Please let us know if you require any further help with any of the steps in this guide. If you need help with creating an issue [GitHub has a guide on how to do so](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue). For questions not covered by this guide you can also join our [Discord](https://discord.com/invite/vM2bagU).