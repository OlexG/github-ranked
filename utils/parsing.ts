export function mergeCommitContributionsWithOthers(res: any) {
  const repositories = res.user.contributionsCollection.commitContributionsByRepository;
  const prRepositories = res.user.contributionsCollection.pullRequestContributionsByRepository;
  const issueRepositories = res.user.contributionsCollection.issueContributionsByRepository;
  const reviewRepositories = res.user.contributionsCollection.pullRequestReviewContributionsByRepository;
  // Merge prRepositories and add if doesn't exist
  for (const prRepo of prRepositories) {
    const repo = repositories.find((r: any) => r.repository.databaseId === prRepo.repository.databaseId);
    if (repo) {
      repo.contributions.totalCount += prRepo.contributions.totalCount;
    } else {
      repositories.push(prRepo);
    }
  }
  // Merge issueRepositories and add if doesn't exist
  for (const issueRepo of issueRepositories) {
    const repo = repositories.find((r: any) => r.repository.databaseId === issueRepo.repository.databaseId);
    if (repo) {
      repo.contributions.totalCount += issueRepo.contributions.totalCount;
    } else {
      repositories.push(issueRepo);
    }
  }
  // Merge reviewRepositories and add if doesn't exist
  for (const reviewRepo of reviewRepositories) {
    const repo = repositories.find((r: any) => r.repository.databaseId === reviewRepo.repository.databaseId);
    if (repo) {
      repo.contributions.totalCount += reviewRepo.contributions.totalCount;
    } else {
      repositories.push(reviewRepo);
    }
  }
  res.user.contributionsCollection.commitContributionsByRepository = repositories;
  return res;
}

export function sortCommitContributions(res: any) {
  res.user.contributionsCollection.commitContributionsByRepository.sort((a: any, b: any) => {
    return (b.contributions.totalCount * b.repository.stargazerCount) - (a.contributions.totalCount * a.repository.stargazerCount);
  });
  return res;
}