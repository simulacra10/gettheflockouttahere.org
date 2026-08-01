---
title: "What is Flock?"
layout: single
description: "A factual explanation of Flock Safety automatic license plate readers, what they record, how searches and alerts work, and how local vehicle data can become part of a much larger surveillance network."
---

Flock Safety is a private surveillance-technology company that sells and operates automatic license plate reader systems for police departments, local governments, businesses, homeowners associations, schools, and other customers.[^flock-lpr]

Its roadside license plate readers are not ordinary traffic cameras. They are designed to photograph passing vehicles, convert visible details into searchable data, compare plate numbers against law-enforcement lists, and preserve each detection as a time-and-location record that can be searched later.[^flock-lpr] The system does this to vehicles generally, not only to vehicles whose drivers are suspected of a crime.

## What an automatic license plate reader does

An automatic license plate reader, commonly abbreviated **ALPR** or **LPR**, combines a camera with optical character recognition and other image-analysis software.

When a vehicle passes within view, the system can:

1. photograph the vehicle and its license plate;
2. attempt to convert the plate image into letters and numbers;
3. classify visible vehicle characteristics;
4. associate the detection with the date, time, and camera location;
5. compare the plate against one or more "hot lists" or watch lists; and
6. store the detection in a database that authorized users can search.[^flock-overview]

The camera does **not** obtain the vehicle's GPS coordinates from the vehicle. It records where the camera was located when the vehicle passed. A series of detections from cameras in different places can nevertheless reveal where a vehicle was seen and when.

## What Flock records about a passing vehicle

Flock states that its license plate readers capture vehicle details rather than continuous general-purpose video.[^flock-lpr] Depending on the camera, image quality, viewing angle, software version, and customer configuration, a detection may contain:

- an image of the vehicle;
- an image or cropped view of the license plate;
- the plate characters produced by automated recognition;
- the state or jurisdiction associated with the plate, when the system can determine it;
- the date and time of the detection;
- the location and identity of the camera;
- vehicle type or body style;
- make, model, and color classifications; and
- visible characteristics such as a roof rack, bumper sticker, temporary plate, damage, or other distinguishing features.[^flock-capture][^flock-overview]

Flock markets this ability as searchable vehicle information. Its product page says its readers provide "searchable data and real-time alerts" rather than requiring officers to review hours of ordinary video.[^flock-lpr]

### It records ordinary drivers too

An ALPR does not first determine whether a driver is suspected of a crime and then activate. It records vehicles that pass within its field of view and later allows users to identify detections that match a plate, description, list, or investigative search.

That distinction is fundamental. The database is created through the routine collection of information about the public. Suspect-related searches occur after that collection, unless a plate already appears on a configured hot list and triggers an immediate alert.

## Hot-list alerts

A customer can configure the system to compare newly read plates against lists of vehicles considered relevant to law enforcement. A match can generate a real-time notification to designated personnel.

Hot lists may include information drawn from national, state, or local sources, as well as locally entered plates. A match is an investigative alert, not proof that the driver committed a crime. Plates may be misread, lists may be outdated, a vehicle may have changed hands, or the person driving may not be the registered owner.

Documented ALPR errors have led to wrongful high-risk traffic stops and litigation. This is one reason officers are generally expected to independently verify an alert before taking enforcement action.[^bi-errors]

## Search after the fact

The more consequential capability is often not the immediate alert. It is the ability to search stored detections later.

Authorized users may be able to search for:

- a complete or partial plate number;
- a vehicle seen during a specified time period;
- a vehicle detected at a particular camera or within an area;
- a make, model, color, body type, or other visual description; or
- combinations of visible characteristics when the plate is unknown.[^flock-overview]

A detective who has no plate number may therefore search for a description such as a dark pickup truck with a roof rack or a vehicle with a particular visible feature. The usefulness of that capability is also what makes the system broader than a simple plate reader: it creates a searchable index of vehicles that traveled past the cameras.

## Retention: usually 30 days by default, not necessarily everywhere

Flock says that ALPR detections are automatically deleted after **30 days by default**, unless a different retention period is required by law or established for the customer.[^flock-retention][^flock-privacy]

That statement needs two qualifications:

1. **Thirty days is a default, not a universal legal limit.** State law, local policy, contract terms, or customer settings may require a shorter or different period.
2. **Evidence may be preserved outside the rolling database.** A detection exported, downloaded, attached to a case, reproduced in a report, disclosed in litigation, or otherwise preserved may remain available after the original database record reaches its deletion date.

A 30-day rolling database is also not trivial. A camera that observes the same commuter repeatedly can create a month-long record of recurring presence at particular locations.

## Who owns and controls the data

Flock says its customers own their data and determine who may access it.[^flock-faq] Flock also says approved users receive role-based access and that searches are logged and reviewable.[^flock-privacy]

Those controls do not mean the information remains confined to the agency that installed the camera. The customer may authorize sharing with other agencies, respond to outside search requests, or participate in broader sharing arrangements. The practical reach of a local camera therefore depends on the customer's configuration, policies, agreements, and user behavior.

## How a local camera becomes part of a larger network

Flock's platform is designed to let agencies use detections from cameras beyond their own jurisdiction when access has been authorized. This can occur through direct agency sharing, regional arrangements, statewide access, or requests made through the platform.

The company describes customers as controlling access, but documented incidents show that local data can be queried for purposes far removed from the reason local officials originally approved the cameras. In 2025, an Associated Press investigation reported that Flock suspended pilot cooperation with federal agencies after concerns about federal access to state and local plate data. Flock's chief executive acknowledged poor communication and inadequate safeguards surrounding the program.[^ap-federal]

This is the structural problem with networked ALPR surveillance: a camera installed under a local crime-prevention rationale can create information usable by agencies, jurisdictions, or investigative programs that local residents never debated.

## Is a warrant required?

There is no single, nationwide rule stating that every ALPR search requires a warrant. Requirements can depend on:

- the jurisdiction;
- state statutes;
- local ordinances and agency policies;
- the duration and comprehensiveness of the tracking;
- the source of the data;
- how the search is conducted; and
- the purpose for which the results are used.

Police agencies frequently use ALPR databases without first obtaining a warrant. Whether a particular use violates the Fourth Amendment remains the subject of litigation and developing case law. It is therefore inaccurate to claim either that warrants are always required or that ALPR searches are categorically exempt from constitutional limits.

The constitutional concern grows as a network becomes dense enough to reconstruct a person's movements over time. A single observation on a public road is not the same thing as maintaining a searchable government-accessible history of repeated observations.

## Flock's claim that it does not identify people

Flock states that its ALPR products capture vehicle information rather than facial data and that they do not use facial recognition.[^flock-capture]

That is an important technical distinction, but it does not make the data anonymous.

A license plate is ordinarily connected through government motor-vehicle records to a registered owner. Police may combine an ALPR detection with registration databases, investigative files, commercial databases, camera footage, reports, or other records. Even when the camera does not identify a face, the plate and travel record may still be used to identify or investigate a person.

The most precise statement is therefore:

> Flock's roadside ALPR generally identifies and classifies vehicles, not faces, but the resulting plate and location information can often be connected to identifiable people through other records.

## Accuracy and false matches

ALPR output is generated by software and can be wrong. Recognition may be affected by glare, weather, plate design, dirt, obstruction, viewing angle, motion, character similarity, temporary plates, or other image conditions.

A false plate reading can become especially dangerous when an alert is treated as confirmation rather than as an unverified lead. Reporting has documented people being stopped at gunpoint or arrested after ALPR errors or failures to verify a match.[^bi-errors]

The existence of an audit log does not prevent an error. It may help determine afterward who searched, what result appeared, or whether procedures were followed.

## Audit logs and misuse

Flock says searches are logged and reviewable.[^flock-privacy] Logging is preferable to unrecorded access, but it is an accountability mechanism, not a physical barrier against misuse.

The real protections depend on questions such as:

- Who reviews the logs?
- How often are they reviewed?
- Are officers required to enter a case number and legitimate purpose?
- Are improper searches automatically flagged?
- Are audits made public?
- What penalties apply to misuse?
- Are outside agencies held to the same rules?
- Can an agency disable broad sharing without losing core functionality?

A surveillance system should be judged by the access it technically permits and the safeguards that are actually enforced, not only by its intended use.

## What the cameras are not

Flock ALPRs should not be confused with Easton's school-zone speed cameras.

A speed-enforcement camera is activated by a defined traffic violation and is used to issue a civil citation. Easton states that its school-zone system photographs vehicles exceeding the posted speed by at least 12 miles per hour during specified enforcement hours.[^easton-speed]

A Flock ALPR serves a different purpose. It creates searchable vehicle detections for alerts and investigations whether or not the driver committed a traffic offense at the camera location.

## The scale changes the nature of the surveillance

Any person standing beside a road can see a passing car. That fact does not settle the public-policy question.

Human observation is normally limited by attention, memory, time, and location. A networked ALPR system automates the observation, labels it, stores it, makes it searchable, and allows it to be compared with observations from other places.

The privacy concern is therefore not that a license plate was visible in public. It is the transformation of ordinary public travel into a persistent, searchable, and shareable record maintained for possible future use.

## What we can presently say about Easton

DeFlock Easton has identified **three Flock ALPR installations associated with Easton**. That local count should be supported on this site with photographs, mapped locations, a Town record, a police record, a contract, or another reproducible source before readers are asked to treat the number as independently verified.

The Town should publicly disclose, at minimum:

- the number and locations of all fixed, mobile, temporary, privately hosted, or police-accessible ALPR cameras;
- the owner of each camera;
- the agency or entity paying for each camera;
- the contract, subscription, and installation costs;
- the date each camera became operational;
- the retention period;
- every agency with direct or indirect access;
- all sharing settings and statewide or national-network settings;
- the hot lists used;
- the written search and alert policies;
- the number of reads, searches, alerts, and confirmed investigative uses;
- the number of false or unverified alerts;
- audit results and incidents of misuse;
- whether data has been accessed for immigration, abortion, protest, political, or other sensitive investigations; and
- the legal authority under which the system was approved and deployed.

Until those records are public, residents cannot independently determine the full reach of Easton's system.

## Why DeFlock Easton seeks a ban

The objection is not merely to one company's name, one retention setting, or one poorly configured account. It is to the routine creation of a government-accessible record of innocent people's movements.

A policy that permits the technology subject to adjustable safeguards still accepts the underlying act: photographing and indexing every passing vehicle so the public's movements can be searched later. DeFlock Easton seeks an ordinance that prohibits that system rather than normalizing it under temporary administrative rules.

[Take Action](/take-action/) to help remove the existing cameras and prohibit future ALPR mass surveillance in Easton.

## Sources

[^flock-lpr]: Flock Safety, ["License Plate Reader Cameras"](https://www.flocksafety.com/products/license-plate-readers). Flock's product description states that its readers capture vehicle details and provide searchable data and real-time alerts.

[^flock-overview]: Flock Safety, ["License Plate Reader Cameras: How LPR Technology Works"](https://www.flocksafety.com/ebooks/license-plate-reader-cameras-overview). Company overview of plate and vehicle-characteristic capture and investigative use.

[^flock-capture]: Flock Safety, ["What Do Flock Cameras Actually Capture?"](https://www.flocksafety.com/blog/what-do-flock-cameras-actually-capture), May 22, 2026. This is the company's description of its own system, including its statement that it captures vehicles rather than faces.

[^flock-retention]: Flock Safety, ["How Flock Deletes License Plate Data: 30-Day Retention"](https://www.flocksafety.com/blog/how-does-flock-handle-license-plate-data-deletion), June 2, 2026. Describes the company's default automated deletion process.

[^flock-privacy]: Flock Safety Trust Center, ["Data Privacy & Protection"](https://www.flocksafety.com/trust/data-privacy). Describes role-based access, search logging, and the company's default retention representation.

[^flock-faq]: Flock Safety, ["Frequently Asked Questions"](https://www.flocksafety.com/faq). States the company's position that customers own their data and determine access.

[^ap-federal]: Associated Press, ["License plate camera company halts cooperation with federal agencies amid investigation concerns"](https://apnews.com/article/cc5f29df94a29ee2c6c2feb2151c8f5e), August 2025. Reports on federal access, the suspension of Flock pilot programs, and acknowledged safeguard failures.

[^bi-errors]: Business Insider, ["AI cameras are everywhere, and people are paying the price for their mistakes"](https://www.businessinsider.com/flock-safety-alpr-cameras-misreads-2026-3), March 2026. Reports documented plate misreads, false matches, and resulting police encounters. Some content may require a subscription.

[^easton-speed]: Town of Easton, Maryland, ["School Zone Speed Cameras"](https://www.eastonmd.gov/209/School-Zone-Speed-Cameras). Describes Easton's separate automated speed-enforcement system and its activation threshold.
