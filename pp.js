if (internshipId) {
  const internship = await Internship.findById(internshipId);
  if (!internship) { res.status(404); throw new Error('Internship not found'); }
}