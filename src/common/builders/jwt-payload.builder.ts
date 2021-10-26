export class JwtPayloadBuilder {
  static toPayload(userId: string, user: string, role: string): Express.User {
    return {
      userId,
      user,
      role,
    };
  }
}
